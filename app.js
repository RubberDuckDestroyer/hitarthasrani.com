// Add an event listener to the submit button
document.getElementById("contact-form").addEventListener('submit', sendDataToLambda);

// Function that sends data to the lambda function
function sendDataToLambda() {

    //Get details from the form
    var formName = document.getElementById('formName');
    var formNameVal = "";
    if(formName)
    {
        formNameVal = formName.value;
    }
    
    var formSubject = document.getElementById('formSubject');
    var formSubjectVal = "";
    if(formSubject)
    {
        formSubjectVal = formSubject.value;
    }

    var formEmail = document.getElementById('formEmailInput');
    var formEmailVal = "";
    if(formEmail)
    {
        formEmailVal = formName.value;
    }
    
    var formMesssage = document.getElementById('formMessage');

    var blankFormField = 0;

    //API Endpoint
    const endpoint = "https://168lcpey6h.execute-api.us-east-1.amazonaws.com/default/contaactForm1-1";

    // Check for blank Input
    if(formNameVal == "" || formEmailVal == "" || formSubjectVal =="")
    {
        blankFormField = 1;
    }

    if(formMesssage == "" && blankFormField == 0)
    {
        formMesssage = formNameVal + " wants to contact you. Please revert to the email.";
    }
    else if (blankFormField == 0  && formMesssage != "")
    {
        formMesssage = formNameVal + " has a message for you:\n" + formMesssage;
    }
    
    if(blankFormField == 0)
    {
        //creating a form object
        var body = {
            email: formEmailVal,
            subject: formSubjectVal,
            message: formMesssage
        }
        console.log("Preparing data : "+ body.subject);
        console.log("Email: "+ body.email);
        //Instantiate the lambda request with endpoint and body
        var lambdaRequest = new Request(endpoint, {
            credentials: 'include',
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body)
        });
        // Call the Fetch API to make our request
        fetch(lambdaRequest);
        console.log("sent")
        window.alert("Message sent!");
    }
    else{
        window.alert("Pleas make sure to fill all fields of the form!!");
    }
}