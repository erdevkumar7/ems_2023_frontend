export function LoginHeader() {
    const getToken: any = localStorage.getItem("loginToken");
    const authToken: any = localStorage.getItem("authToken");
  
    if (getToken) {
      return { logintoken: `${getToken}` };
    } else {
      return {};
    }
  }