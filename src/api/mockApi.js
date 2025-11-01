import MockAdapter from "axios-mock-adapter";
import api from "./api";

const mock = new MockAdapter(api, { delayResponse: 500 });

// ---- MOCK DATA ----
let users = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Editor User', email: 'editor@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Viewer User', email: 'viewer@example.com', role: 'Viewer', status: 'Active' },
];

let workInstructions = [
  { id: 1, title: 'WI 001', product: 'Product A', revision: 'A', status: 'Active' },
  { id: 2, title: 'WI 002', product: 'Product B', revision: 'B', status: 'Active' },
  { id: 3, title: 'WI 003', product: 'Product C', revision: 'C', status: 'Draft' },
];

// ---- LOGIN ----
mock.onPost('/login').reply((config) => {
  const { email, password } = JSON.parse(config.data);

  const user = users.find(u => u.email === email);

  if (user && password === 'Password123*') {
    return [200, user];
  }

  return [401, { message: 'Invalid email or password' }];
});

// ---- USERS ENDPOINTS ----
mock.onGet('/users').reply(200, users);

mock.onPost('/users').reply((config) => {
  const newUser = JSON.parse(config.data);
  newUser.id = Date.now();
  users.push(newUser);
  return [201, newUser];
});

mock.onDelete(/\/users\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop());
  users = users.filter(u => u.id !== id);
  return [200];
});

// ---- WORK INSTRUCTIONS ENDPOINTS ----
mock.onGet('/wis').reply(200, workInstructions);

mock.onPost('/wis').reply((config) => {
  let newWI = {};

  // Handle both JSON and FormData uploads
  try {
    newWI = JSON.parse(config.data);
  } catch {
    if (config.data instanceof FormData) {
      newWI = Object.fromEntries(config.data.entries());

      // Handle file upload (create preview URL)
      const file = newWI.file;
      if (file instanceof File) {
        newWI.file = {
          name: file.name,
          url: URL.createObjectURL(file),
        };
      }
    }
  }

  newWI.id = Date.now();
  workInstructions.push(newWI);

  return [201, newWI];
});


mock.onDelete(/\/wis\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop());
  workInstructions = workInstructions.filter(wi => wi.id !== id);
  return [200];
});

export default api;
