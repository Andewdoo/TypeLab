import './signin.css'

export default function Signin() {
	return (
		<main className="signin-page">
			<section className="signin-card">
				<h1>Sign In</h1>
				<p className="subtitle">Enter your email and password</p>
				
				<form className="signin-form">
					<div className="field">
						<label>Email</label>
						<input type="email" />
					</div>
					
					<div className="field">
						<div className="field-header">
							<label>Password</label>
							<a href="#" className="forgot-link">Forgot password?</a>
						</div>
						<input type="password" />
					</div>
					
					<button type="submit" className="login-btn">LOGIN</button>
					
					<p className="alt-text">
						Don't have an account? <a href="#/signup" className="link">Sign up</a>
					</p>
					
					<p className="divider">Sign in with</p>
					
					<div className="social-buttons">
						<button type="button" className="social-btn facebook">
							<img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
						</button>
						<button type="button" className="social-btn apple">
							<img src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="Apple" />
						</button>
						<button type="button" className="social-btn google">
							<img src="https://cdn-icons-png.flaticon.com/512/2504/2504914.png" alt="Google" />
						</button>
					</div>
				</form>
			</section>
		</main>
	)
}



