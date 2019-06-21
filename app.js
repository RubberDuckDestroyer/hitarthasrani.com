// Add an event listener to the submit button
document.getElementById("contact-form").addEventListener('submit', sendDataToLambda);

// Function that sends data to the lambda function
function sendDataToLambda(e) {
    e.preventDefault();

    //Get details from the form
    var formName = document.querySelector('.formName').value;
    var formSubject = document.querySelector('.formSubject').value;
    var formEmail = document.querySelector('.formEmailInput').value;
    var formMesssage = document.querySelector('.formMessage').value;

    var blankFormField = 0;

    //API Endpoint
    const endpoint = "https://gx2e7uf676.execute-api.us-east-1.amazonaws.com/prod";

    // Check for blank Input
    if(formName == "" || formEmail == "" || formSubject =="")
    {
        blankFormField = 1;
    }

    if(formMesssage == "" && blankFormField == 0)
    {
        formMesssage = formName + " wants to contact you. Please revert to the email.";
    }
    else if (blankFormField==0  && formMesssage!="")
    {
        formMesssage = formName + " has a message for you:\n" + formMesssage;
    }
    
    if(blankFormField == 0)
    {
        //creating a form object
        var body = {
            email: formEmail,
            subject: formSubject,
            messae: formMesssage
        }

        //Instantiate the lambda request with endpoint and body
        var lambdaRequest = new Request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
        // Call the Fetch API to make our request
        fetch(lambdaRequest)
        window.alert("Message sent!");
    }
    else{
        window.alert("Pleas make sure to fill all fields of the form!!");
    }
}