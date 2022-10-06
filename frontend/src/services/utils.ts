export const mapAuthBearerToken = (token: string) => {
  return { 
    headers: { 
      Authorization: `Bearer ${token}` 
    }
  }
}

export const getToken = (): string => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  return user.token;
}