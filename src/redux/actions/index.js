export default function userAction(email) {
  return {
    type: 'EMAIL',
    email,
  };
}
