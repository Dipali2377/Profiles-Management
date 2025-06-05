# 👤 Profile Management App

A simple MERN stack application to manage and display resident/user profiles. Users can add a profile with their name, role, and social links (LinkedIn, Twitter). The added profiles are displayed in styled cards on a single page.

---

## 🚀 Features

- Add new profiles using a popup modal
- Upload profile image (optional)
- Display all added profiles in card layout
- Include social icons for LinkedIn and Twitter
- Responsive UI with modern styles

---

## Preview

![App Screenshot](/client/src/assets/profiles-view.jpeg)

## 🛠️ Tech Stack

**Frontend**: React, Axios, Toastify  
**Backend**: Node.js, Express.js, MongoDB, Multer  
**Database**: MongoDB Atlas

---

## 🧾 How It Works

1. User clicks **"+ Add Profile"** button
2. A modal appears to enter:
   - First name
   - Last name
   - Role
   - Optional image upload
   - LinkedIn and Twitter URLs
3. Upon submission, the data is sent to the backend and stored in MongoDB.
4. The updated list is fetched and displayed.

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Dipali2377/Profiles-Management.git
cd Profiles-Management
```
