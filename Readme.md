# Raspberry Pi Web Control Panel

This project provides a web-based control panel to manage GPIO pins on a Raspberry Pi. It includes an HTML interface to toggle the state of a GPIO pin and a live video feed from a connected camera.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Files](#files)
- [License](#license)

## Installation

### Prerequisites

- Raspberry Pi with Raspbian OS installed
- Apache or any other web server with PHP support
- GPIO utility (`gpio` command-line tool)

### Steps

1. **Update and Upgrade the Raspberry Pi:**
    ```bash
    sudo apt-get update
    sudo apt-get upgrade
    ```

2. **Install Apache and PHP:**
    ```bash
    sudo apt-get install apache2 php libapache2-mod-php
    ```

3. **Install WiringPi:**
    ```bash
    sudo apt-get install wiringpi
    ```

4. **Clone the Repository:**
    Navigate to the web server's root directory and clone this repository:
    ```bash
    cd /var/www/html
    sudo git clone https://github.com/yourusername/raspberry-pi-web-control-panel.git
    ```

5. **Set Up Permissions:**
    ```bash
    sudo chown -R www-data:www-data /var/www/html/raspberry-pi-web-control-panel
    sudo chmod -R 755 /var/www/html/raspberry-pi-web-control-panel
    ```

## Usage

1. **Access the Web Interface:**
    Open a web browser and navigate to your Raspberry Pi's IP address:
    ```
    http://<your-raspberry-pi-ip>/raspberry-pi-web-control-panel/
    ```

2. **Toggle the GPIO Pin:**
    Use the main switch on the webpage to turn the GPIO pin on or off. The status will be displayed on the page.

3. **View Live Feed:**
    The live video feed from the camera connected to the Raspberry Pi is available under the "Live feed" section.

## Files

- `index.html`: The main HTML file for the web interface.
- `index.php`: The PHP script that handles GPIO pin state changes.
- `Style.css`: The stylesheet for the HTML page.
- `images/logo.png`: Logo displayed on the webpage.
