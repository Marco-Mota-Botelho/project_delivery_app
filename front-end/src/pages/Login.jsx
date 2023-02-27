function Login() {
  return (
    <div>
      <input
        type="email"
        data-testid="common_login__input-email"
        placeholder="Digite seu email"
      />
      <input
        type="text"
        data-testid="common_login__input-password"
        placeholder="Digite sua senha"
      />
    </div>
  );
}

export default Login;
