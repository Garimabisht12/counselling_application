function HeroSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f9] px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-10 text-center flex flex-col justify-center items-center text-[#333] font-sans">
        {/* Heading */}
        <h1 className="text-[2rem] mb-5 text-[#2c3e50] font-semibold">
          Welcome to the Counselling System
        </h1>

        {/* Description */}
        <p className="text-[1.2rem] mb-8 text-[#555]">
          Please choose your sign-in method:
        </p>

        {/* Options */}
        <div className="flex flex-col sm:flex-row sm:justify-around w-full gap-4">
          {/* Applicant Sign-In */}
          <a
            href="SignIn"
            className="inline-block w-full sm:w-[45%] px-6 py-3 text-[1rem] text-white text-center rounded-md bg-[#3498db] hover:bg-[#2980b9] transition"
          >
            Applicant Sign In
          </a>

          {/* Admin Sign-In */}
          <a
            href="adminSignIn"
            className="inline-block w-full sm:w-[45%] px-6 py-3 text-[1rem] text-white text-center rounded-md bg-[#e74c3c] hover:bg-[#c0392b] transition"
          >
            Admin Sign In
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
