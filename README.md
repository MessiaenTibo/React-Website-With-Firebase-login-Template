# WebsiteLoginAndRegistrationTemplate

This is a template project with a basic login and registration logic. Build in react.

## How to run

1. Clone the repository
2. Run `npm install` in the root directory
3. Create a new project in Firebase and enable email/password authentication
4. Add a `.env` file in the root directory with the following content:

```
  VITE_apiKey = replace_with_firebase_api_key
  VITE_authDomain = replace_with_firebase_auth_domain
  VITE_projectId = replace_with_firebase_project_id
  VITE_storageBucket = replace_with_firebase_storage_bucket
  VITE_messagingSenderId = replace_with_firebase_messaging_sender_id
  VITE_appId = replace_with_firebase_app_id
  VITE_measurementId = replace_with_firebase_measurement_id
```

5. Run `npm run dev` to start the project
