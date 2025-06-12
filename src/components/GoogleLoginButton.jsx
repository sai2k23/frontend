const GoogleLoginButton = () => {
  const handleLogin = () => {
    window.open("https://excelanalytics-backend-l7ql.onrender.com/auth/google", "_self");
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
