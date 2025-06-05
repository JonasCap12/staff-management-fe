export const createAccount = async ({ email, password }) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role: 'employee' }),
  });
  if (!response.ok) throw new Error('Failed to create account');
  const data = await response.json();
  return data.userId;
};

export const createEmployee = async (employeeData) => {
  const response = await fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData),
  });
  if (!response.ok) throw new Error('Failed to create employee');
  return await response.json();
};