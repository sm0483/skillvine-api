interface ITokenResponse {
  payload: {
    id: string;
    userLogin: boolean;
    name?: string;
  };
  iat: number;
  exp: number;
}

export default ITokenResponse;
