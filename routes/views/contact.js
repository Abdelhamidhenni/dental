var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
var nodemailer = require('nodemailer');


exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'contact';
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Enquiry item to the database
	view.on('post', { action: 'contact' }, function (next) {
		// onsole.log('hit route');
		  var mailOpts, smtpTrans;
		  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
		  smtpTrans = nodemailer.createTransport('SMTP', {
		      service: 'Gmail',
		      auth: {
		          user: "padmon29@gmail.com",
		          pass: "blvsnrroqbfnhaaf" 
		      }
		  });
		  console.log(req.body);
		  //Mail options
		  mailOpts = {
		      from: req.body.sendername + ' &lt;' + req.body.emailaddress + '&gt;' + req.body.telephone, //grab form data from the request body object
		      to: 'padmon29@gmail.com',
		      subject: 'Kupa Dental email: '+req.body.sendersubject,
		      text: 'From:'+req.body.sendername + '    Email: ' + req.body.emailaddress + '   Phone:' + req.body.telephone + '        Message:' +req.body.sendermessage
		  };
		  smtpTrans.sendMail(mailOpts, function (error, response) {
		      console.log('send mail');
		      //Email not sent
		      if (error) {
		      	console.log('error sending the email' + error);
		          locals.validationErrors = err.errors;
		      }
		      //Yay!! Email sent
		      else {
		      	console.log('send!');
		          locals.enquirySubmitted = true;  
		          next();    
		      }
		  });
		// var newEnquiry = new Enquiry.model();
		// var updater = newEnquiry.getUpdateHandler(req);
		// console.log('posting the enquiry');
		// updater.process(req.body, {
		// 	flashErrors: true,
		// 	fields: 'name, email, phone, message',
		// 	errorMessage: 'There was a problem submitting your enquiry:',
		// }, function (err) {
		// 	if (err) {
		// 		locals.validationErrors = err.errors;
		// 		console.log('error post: '+err);
		// 	} else {
		// 		locals.enquirySubmitted = true;
		// 		console.log('posted!!!');
		// 	}
		// 	next();
		// });
	});

	view.render('contact');
};
