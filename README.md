
# College Voting System

This is a serverless web-based online voting system built for college elections. It uses HTML, CSS, and JavaScript for the frontend, and AWS Lambda with DynamoDB and API Gateway for the backend.

---

## 🧩 Features

- Student ID verification with branch-based eligibility
- Candidate selection interface with visual cards
- Voting with confirmation and localStorage-based tracking
- Admin panel (password protected) to view real-time results
- Fully serverless backend with AWS Lambda, DynamoDB, and API Gateway

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (jQuery)

### Backend (Serverless)
- **AWS Lambda**:
  - `insertData`: Inserts votes into DynamoDB
  - `getStudent`: Fetches all voting data
- **DynamoDB**:
  - Table name: `votingData` (with `studentId`, `candidate_name`)
- **API Gateway**:
  - Connects frontend (JavaScript AJAX) to backend Lambda functions securely over HTTP

---

## 📂 File Structure

```
college-voting-system/
│
├── votejhondhale.html   # Main web interface
├── style.css            # Stylesheet
├── scripts.js           # JavaScript logic + API interaction
├── README.md            # Project documentation
├── insertData.py        # Lambda function to insert votes
└── getStudent.py        # Lambda function to retrieve votes
```

---

## 🔁 Lambda Functions

### `insertData` (POST handler)
Stores a student's vote in the DynamoDB table `votingData`.

Handles:
- JSON from POST body
- Validates inputs
- Connected to frontend via API Gateway
- CORS headers for browser compatibility

### `getStudent` (GET handler)
Returns all vote records from the `votingData` table.

Handles:
- CORS headers for access from frontend
- Returns array of vote records

---

## 🔐 Admin Access

To view results, enter the following access code:

```plaintext
admin123
```

> Note: This is hard-coded in the frontend for demonstration purposes only.

---

## 🌐 Hosting (Optional)

You can host this project using **GitHub Pages**:
1. Go to repo Settings → Pages
2. Set source to `main` branch
3. Access your site at: `https://<your-username>.github.io/college-voting-system/`

---


---

## 🗳️ Voting Rules & Logic

- **Only specific student ID ranges** are eligible to vote based on department:
  - Mechanical: `10000–19999`
  - IT: `20000–29999`
  - Computer: `50000–59999`
  - Electrical: `70000–79999`
  - Chemical: `80000–89999`
- **Each student ID can vote only once**. Voting attempts are tracked using `localStorage` in the browser.
- **Only the admin** (with password `admin123`) can view the voting results.

---

## ☁️ Hosting the Frontend with Amazon S3 (Optional)

You can host the frontend (`HTML`, `CSS`, `JS`) using an Amazon S3 bucket:

1. Go to the AWS S3 Console and create a new bucket (e.g., `college-voting-system`).
2. Enable **Static Website Hosting** in the bucket settings.
3. Upload the following files:
   - `votejhondhale.html` (set as index document)
   - `style.css`
   - `scripts.js`
   - Any candidate images (e.g., `logo1.png.jpg` etc.)
4. Set appropriate **public read permissions** (bucket policy).
5. Access your hosted site via the S3 website endpoint provided.

> Ensure CORS is enabled for your S3 bucket if accessing Lambda via API Gateway.

---


---

## 📸 Screenshots

### 🧾 Home Page
![Home Page](Screenshot%202025-04-30%20150705.png)

### ✅ Vote Confirmation
![Vote Confirmation](Screenshot%202025-04-30%20150954.png)

### 🗳️ Vote Success
![Vote Success](Screenshot%202025-04-30%20151006.png)

### 🔐 Admin Login Prompt
![Admin Login Prompt](Screenshot%202025-04-30%20151027.png)

### 📊 Results Displayed
![Results](Screenshot%202025-04-30%20151043.png)

### 🚫 Duplicate Vote Blocked
![Duplicate Vote Blocked](Screenshot%202025-04-30%20151315.png)

### 🧾 DynamoDB Data
![DynamoDB Table](Screenshot%202025-04-30%20151446.png)


## 📄 License

This project is for educational use only.
