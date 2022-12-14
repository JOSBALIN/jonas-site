import React from "react";

export default function Subscribe() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
    };

    const data = {
      subscriberName: target.name,
      subscriberEmail: target.email,
    };
    //call to the Netlify Function you created
    fetch("http://www.jonasbalin.com/.netlify/functions/triggerSubscribeEmail", {
      method: "POST",
      body: JSON.stringify({
        subscriberName: "PERSON NAME",
        subscriberEmail: "jackbamm@hotmail.com",
        inviteeEmail: "jonasbalin@gmail.com",
      }),
      headers: {
        
      }
    });
  };
  return (
    <div className="subscribe-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" required />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}

