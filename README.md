# RoadBuddies
RoadBuddies is a user-friendly carpooling platform that connects travelers sharing similar routes. The platform simplifies the process of offering and finding rides, promoting a community of users who share rides and expenses. Users can sign up, create profiles, offer or find rides, and leave ratings and reviews to enhance community trust.


# RoadBuddies Project Overview

## Project Summary

RoadBuddies is a user-friendly carpooling platform that connects travelers heading in the same direction. It's designed to simplify the process of offering and finding rides, fostering a community of users who share the road and expenses.


## How It Works

1. **Getting Started:**

   - Visit [RoadBuddies.com](https://www.roadbuddies.com) and create your account.
   - Complete your profile, including travel preferences and a brief bio.

2. **Offering a Ride:**

   - Navigate to the "Offer a Ride" section.
   - Input your travel details: route, departure time, and available seats.
   - Confirm the ride details and make it visible to potential passengers.

3. **Finding a Ride:**

   - Explore available rides based on your destination and preferences.
   - Send a request to join a ride, and wait for confirmation from the driver.

4. **Rating and Reviews:**

   - After completing a ride, both the driver and passengers can leave a rating and brief review.
   - Ratings and reviews contribute to the overall community trust and reliability.
  
## Technologies Used

RoadBuddies utilizes modern web technologies to ensure a seamless user experience:

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Getting Started

1. **Sign Up:**

   - Visit [RoadBuddies.com](https://www.roadbuddies.com) and click on "Sign Up."
   - Provide basic information and create your account.

2. **Create a Profile:**

   - Fill in your profile details, including travel preferences and a profile picture.

## Offering a Ride

1. **Navigate to "Offer a Ride":**

   - Click on the "Offer a Ride" section.
   - Input your travel details, such as the starting point, destination, departure time, and available seats.

2. **Confirm and Publish:**

   - Review your ride details and click "Publish" to make it visible to potential passengers.

## Rating and Reviews

1. **After the Ride:**

   - Once the ride is completed, both the driver and passengers can leave a rating (1 to 5 stars) and a brief review.

2. **Build Community Trust:**

   - Ratings and reviews contribute to the overall trustworthiness of the RoadBuddies community.
## RoadRides Server Setup
Welcome to the setup guide for the RoadRides server. This guide will help you install and run the server on your local machine.

Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js (version 12 or higher)
npm (Node Package Manager)
Installation Steps
Follow these steps to set up the RoadRides server:

1. **Clone the Repository.**
   - git clone https://github.com/your-username/roadrides.git
2. **Install Dependencies.**
   - npm install
3. **Configure Environment Variables.**
 - Create a .env file in the root directory of the project and provide the necessary environment variables.
 - Example:

   - EMAIL = 'server_email_for_sending_messages_to_the_clients'
   - PASSWORD = 'SETUPPASSWORD'
   - SECRETKEY = 'KEY'
   - MONGODBSTRING = 'YOUR_MONGODB_STRING'
   - EMAIL: This should be the email address used by the server for sending messages to clients.
   - PASSWORD: Set a strong password for the email account specified in the EMAIL variable.
   - SECRETKEY: Choose a secure secret key for your application.
   - MONGODBSTRING: Provide the MongoDB connection string for your database.
      Ensure that you keep this .env file secure and do not share it publicly, especially if it contains sensitive information like passwords and connection strings.

4. **Database Setup.**
      Make sure you have MongoDB installed and running on your system. Update the MONGODB_URI variable in the .env file with your MongoDB connection string.

5. **Run the Server.**
      - npm start
   - The server should now be running locally on the specified port.

If you encounter any issues or have questions regarding the RoadRides server, please open an issue on the GitHub repository.

Happy riding! 🚲🛣️




