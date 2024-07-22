// public/loginHandler.js
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login');
    const reactRoot = document.getElementById('react-root');
  
    loginButton.addEventListener('click', () => {
      // Hide all body content
      document.body.innerHTML = '';
      reactRoot.style.display = 'block';
  
      // Load and render React component
      const script = document.createElement('script');
      script.src = '/path/to/compiled/LoginSignup.js'; // Change this to the actual path
      script.onload = () => {
        const { default: LoginSignup } = window;
        const root = ReactDOM.createRoot(reactRoot);
        root.render(React.createElement(LoginSignup, { action: 'Login' }));
      };
      document.body.appendChild(script);
    });
  });
  