function executeCommand() {
    const command = document.getElementById("command").value;
    const output = document.getElementById("output");

    if (command === "login") {
        // Implement login logic here (read from stuff.txt)
        output.innerHTML = "Logging in...";
    } else if (command === "register") {
        // Implement registration logic here (write to stuff.txt)
        output.innerHTML = "Registering...";
    } else if (command === "keygen 123") {
        // Implement key generation logic here
        output.innerHTML = "Generating key...";
    } else if (command === "deleteuser 123") {
        // Implement user account deletion logic here
        output.innerHTML = "Deleting user account...";
    } else {
        output.innerHTML = "Invalid command.";
    }
}
