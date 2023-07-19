// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = firebase.database();

// Function to send email
function sendEmail(emailAddress, subject, message) {
  // Implement your email sending logic here
  console.log(`Sending email to: ${emailAddress}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);
}

// Function to create the time capsule
function createTimeCapsule(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const content = document.getElementById("content").value;
  const revealDate = document.getElementById("revealDate").value;
  const emailNotification = document.getElementById("emailNotification")
    .checked;

  // Store the time capsule data in the Firebase Realtime Database
  const timeCapsuleData = {
    username,
    email,
    content,
    revealDate,
    emailNotification
  };

  // Push the time capsule data to the Firebase database
  const timeCapsuleRef = database.ref("timeCapsules").push();
  timeCapsuleRef.set(timeCapsuleData);

  // If email notification is enabled, calculate the time difference and set up the email
  if (emailNotification) {
    const currentDate = new Date();
    const revealDateTime = new Date(revealDate);
    const timeDifferenceMs = revealDateTime - currentDate;

    // Schedule the email to be sent in the future
    setTimeout(() => {
      const subject = `Your Time Capsule - Revealed`;
      const message = `Hello ${username}! It's time to reveal your time capsule. Here is the content you saved: ${content}`;
      sendEmail(email, subject, message);
    }, timeDifferenceMs);
  }

  console.log("Time capsule created:", timeCapsuleData);
  alert("Time capsule created successfully!");
  document.getElementById("timeCapsuleForm").reset();
}

// Attach the form submission event listener
const form = document.getElementById("timeCapsuleForm");
form.addEventListener("submit", createTimeCapsule);
