import BoxContainer from "../../../Util/BoxContainer";

const Testimonials = () => {
  return (
    <BoxContainer className="my-10">
      <h2 className="text-4xl font-bold text-center mb-10 uppercase">
        Testimonials
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-gray-700 mb-4">
            "I reported a pothole and it was fixed in 2 days!"
          </p>
          <div class="flex items-center">
            {/* <img class="w-10 h-10 rounded-full mr-3" src="/user1.jpg" alt="User"> */}
            <div>
              <p class="font-semibold">Jane Doe</p>
              <p class="text-gray-500 text-sm">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-gray-700 mb-4">
            "I reported a pothole and it was fixed in 2 days!"
          </p>
          <div class="flex items-center">
            {/* <img class="w-10 h-10 rounded-full mr-3" src="/user1.jpg" alt="User"> */}
            <div>
              <p class="font-semibold">Jane Doe</p>
              <p class="text-gray-500 text-sm">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <p class="text-gray-700 mb-4">
            "I reported a pothole and it was fixed in 2 days!"
          </p>
          <div class="flex items-center">
            {/* <img class="w-10 h-10 rounded-full mr-3" src="/user1.jpg" alt="User"> */}
            <div>
              <p class="font-semibold">Jane Doe</p>
              <p class="text-gray-500 text-sm">Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>
      </div>
    </BoxContainer>
  );
};

export default Testimonials;
