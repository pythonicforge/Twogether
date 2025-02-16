# Twogether

This is a video calling application built with Django. It allows users to connect and communicate via video calls.

## Features

- **User Authentication**: Secure login and registration for users.
- **Real-time Video Calling**: Connect with others via high-quality video calls.
- **Responsive Design**: Optimized for both desktop and mobile devices using Tailwind CSS.
- **Live Browser Reload**: Instant updates during development with `django_browser_reload`.

## Requirements

- Python 3.8+
- Django 5.1.6
- Node.js (for Tailwind CSS)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/vide-calling-app.git
    cd vide-calling-app
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Install the required Node.js packages for Tailwind CSS:
    ```sh
    cd theme/static_src
    npm install
    cd ../../
    ```

5. Apply the database migrations:
    ```sh
    python manage.py migrate
    ```

6. Run the development server:
    ```sh
    python manage.py runserver
    ```

## Usage

1. **Register an Account**: Sign up with your email and password.
2. **Login**: Use your credentials to log in.
3. **Start a Video Call**: Navigate to the video call section and start a new call or join an existing one.
4. **Enjoy**: Communicate with your friends and colleagues in real-time.

## Deployment

To deploy the application to Heroku, follow these steps:

1. Install the Heroku CLI and log in:
    ```sh
    heroku login
    ```

2. Create a new Heroku app:
    ```sh
    heroku create
    ```

3. Add a `Procfile` to the root of your project directory:
    ```plaintext
    web: python manage.py runserver 0.0.0.0:$PORT
    ```

4. Commit your changes and push to Heroku:
    ```sh
    git add .
    git commit -m "Prepare app for Heroku deployment"
    git push heroku main
    ```

5. Open your app in the browser:
    ```sh
    heroku open
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
