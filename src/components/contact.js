import React, { Component } from 'react';

// Create Component
class Contact extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      contactEmail: '',
      contactMessage: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeMsg = this.handleChangeMsg.bind(this);
  }

  handleChange(event) {
    this.setState({
      contactEmail: event.target.value,
    });
  }

  handleChangeMsg(event) {
    this.setState({
      contactMessage: event.target.value
    });
  }

  handleSubmit(event) {

    event.preventDefault();
    this.setState({
      contactEmail: '',
      contactMessage: ''
    });

    $.ajax({

      url: process.env.NODE_ENV !== "production" ? '/getMail' : "http://www.fransbernhard.se/magden/php/mailer.php",
      type: 'POST',
      data: {
        'form_email': this.state.contactEmail,
        'form_msg': this.state.contactMessage
      },
      cache: false,
      success: function(data) {
        // Success..
        this.setState({
          contactEmail: 'success',
          contactMessage: 'We have received your message and will get in touch shortly. Thanks!'
        });
        $('#formContact').slideUp();
        $('#formContact').after('<h1>Tack för ditt mejl!</h1><p>Återkommer så fort som möjligt.</p>');
        console.log('success', data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(xhr, status);
        console.log(err);
        this.setState({
          contactEmail: 'danger',
          contactMessage: 'Sorry, there has been an error.'
        });
        console.log(this.state.contactEmail + this.state.contactMessage + 'fail');
      }.bind(this)

    });

  }

  render() {
    return (
      <div className="contact" id="contact">
        <div className="filter">
          <form className="form" onSubmit={this.handleSubmit} id="formContact">
            <label>Email</label>
            <input id="formEmail" type="email" name="formEmail" value={this.state.contactEmail} onChange={this.handleChange} required/>
            <label>Meddelande</label>
            <textarea id="formMsg" name="formMsg" rows="8" cols="40" value={this.state.contactMessage} onChange={this.handleChangeMsg} required></textarea>
            <input type="submit" value="Submit" className="btn--cta" id="btn-submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default Contact;
