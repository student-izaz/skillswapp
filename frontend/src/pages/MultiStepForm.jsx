import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../store/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gender: "",
    phone: "",
    age: "",
    country: "",
    state: "",
    skillsOffered: "",
    skillsWanted: "",
  });
  const [loading, setLoading] = useState();
  // console.log(token)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    setStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
  };

  const prevStep = () => {
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const skipStep = () => {
    nextStep();
  };

  const { user, token, API_URL, login } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      gender: formData.gender,
      phone: formData.phone,
      age: formData.age,
      country: formData.country,
      state: formData.state,
      skillsToTeach: formData.skillsOffered.split(",").map((s) => s.trim()),
      skillsToLearn: formData.skillsWanted.split(",").map((s) => s.trim()),
      isProfileComplete: true, 
    };

    try {
      const res = await fetch(`${API_URL}/api/profile/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send your access token
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data)

        login({
          userData: data.user,
          tokenData: data.token,
        });

        // toast.success("Profile created successfully");
        navigate("/home");
      } else {
        console.error("Profile creation failed:", data.message);
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="relative max-w-xl mx-auto bg-white p-6 rounded-lg shadow mt-10">
      {/* Back button top right */}
      {step > 1 && (
        <button
          type="button"
          onClick={prevStep}
          className="absolute top-4 right-4 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
        >
          Back
        </button>
      )}

      <h2 className="text-2xl text-gray-800 font-bold mb-4">
        Step {step} of 3
      </h2>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-yellow-500 h-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Heading Text */}
      <h3 className="text-2xl font-bold text-yellow-500 mb-2">
        Let's Get to Know You 👋
      </h3>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        Please fill in a few quick details to help others discover your talents
        and the skills you're interested in learning. This won’t take more than
        a minute!
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Step 1 */}
        {step === 1 && (
          <>
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <input
              type="text"
              name="skillsOffered"
              placeholder="Skills Offered (comma-separated)"
              value={formData.skillsOffered}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="skillsWanted"
              placeholder="Skills Wanted (comma-separated)"
              value={formData.skillsWanted}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={skipStep}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Skip
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {loading ? <LoadingSpinner /> : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
