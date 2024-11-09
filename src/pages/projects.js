import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

class StudentDay extends React.Component {
    render() {
        const { data } = this.props
        const siteTitle = data.site.siteMetadata.title
        const posts = data.allMarkdownRemark.edges

        function sendDataToLambda(e) {

            e.preventDefault()

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
                formEmailVal = formEmail.value;
            }
            
            var formMesssage = formNameVal + " wants to contact you. Please revert to the email.";
        
            //API Endpoint
            const endpoint = "https://168lcpey6h.execute-api.us-east-1.amazonaws.com/default/contaactForm1-1";
        
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
            console.log("sent");
            window.alert("Message sent!");
            
        }

        return(
            <Layout location={this.props.location} title={siteTitle}>
                <p>Projects</p>
                <ol>
                    <li>
                    <h6>Contact Form</h6>
                        <form className="form-horizontal" id="contact-form" onSubmit={sendDataToLambda} >
                            
                            <div className="form-group">
                                <label className="col-sm-4 control-label" htmlFor="formName">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="formName" placeholder="Your Name"/>
                                </div>
                            </div>
                    
                            <div className="form-group">
                                <label className="col-sm-4 control-label" htmlFor="formSubject">Subject</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="formSubject" placeholder="Subject"/>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <label className="col-sm-4 control-label" htmlFor="formEmailInput">Email address</label>
                                <div className="col-sm-offset-2 col-sm-10">
                                <input type="email" className="form-control" id="formEmailInput" aria-describedby="emailHelp" placeholder="Enter email"/>
                                <small id="emailHelp" className="form-text text-muted">I'll never share your email with anyone else.</small>
                                </div>					
                            </div>
                            
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-primary" id="formSubmitButton" >Submit Details</button>
                                </div>
                            </div>
                        </form>
                    </li>
                </ol>
            </Layout>
        )
    }
}

export default StudentDay


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            videoSrcURL
            videoTitle
          }
        }
      }
    }
  }
`