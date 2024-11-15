# Full Stack Purchasey

This is a Full Stack E-Commerce Website built with **Next.js 14**, **Tailwind CSS**, **Firebase**,
- User authentication with Firebase

- Shopping cart functional
- Admin panel for managing products, orders, and users

## Technologies Used

- **Frontend**: Next.js 14, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication)
echo "# Purchasey.in" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Jubair0786/Purchasey.in.git
git push -u origin main

git remote add origin https://github.com/Jubair0786/Purchasey.in.git
git branch -M main
git push -u origin main


1. Clone the repository:
   ```bash
   git clone <https://github.com/Jubair0786/Purchasey.in.git>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env.local` file in the root directory and add the following:

   
## Firestore Security Rules


```

## Firestore Storage Security Rules

```plaintext
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid != null && firestore.exists(/databases/(default)/documents/admins/$(request.auth.token.email));
    }
  }
}
```

## Demo

You can explore the demo of the e-commerce website at [this link ]

To access the Admin Panel, use the following credentials:



(Note: This demo admin account has read and write permissions disabled for security purposes.)

## Conclusion

# Goldiee
