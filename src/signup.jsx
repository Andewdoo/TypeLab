import './signup.css'

export default function SignUp() {
	return (
		<main className="signup-page">
			<section className="signup-card">
				<h1>Sign Up</h1>
				<p className="subtitle">Create your account to get started</p>
				
				<form className="signup-form">
					<div className="field">
						<label>Name</label>
						<input type="text" placeholder="Your name" />
					</div>
					
					<div className="field">
						<label>Email</label>
						<input type="email" placeholder="you@example.com" />
					</div>
					
					<div className="field">
						<label>Password</label>
						<input type="password" placeholder="Create password" />
					</div>
					
					<div className="field">
						<label>Confirm Password</label>
						<input type="password" placeholder="Confirm password" />
					</div>
					
					<button type="submit" className="signup-btn">SIGN UP</button>
					
					<p className="alt-text">
						Already have an account? <a href="#/signin" className="link">Log in</a>
					</p>
					
					<p className="divider">Sign up with</p>
					
					<div className="social-buttons">
						<button type="button" className="social-btn facebook">
							<img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
						</button>
						<button type="button" className="social-btn apple">
							<img src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="Google" />
						</button>
						<button type="button" className="social-btn google">
							<img src="apple-logo.png" alt="apple" />
						</button>
					</div>
				</form>
			</section>
		</main>
	)
}
