interface ITokenResponse {
  payload: {
    id: string;
    userLogin: boolean;
  };
  iat: number;
  exp: number;
}

export default ITokenResponse;
