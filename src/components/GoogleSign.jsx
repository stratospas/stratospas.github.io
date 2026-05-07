// src/components/Signup.js
import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { Button, Form, Image } from "react-bootstrap";

const GoogleSign = ({language}) => {
	
    function sg() {		
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Google sign-in successful:", result.user);
            })
            .catch((error) => {
                console.error("Google sign-in error:", error);
            });
    }

	return (
		
        <Button variant="light" size="lg" className="border rounded shadow" onClick={sg}>
            <Image src="g_image1.png" alt="Google logo" style={{ width: '30px', marginRight: '10px' }}/>
            {language.googleLogin}
        </Button>
	);
};

export default GoogleSign;