var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var nodemailer = require('nodemailer');


// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/services', routes.views.services);
	app.get('/portfolio', routes.views.portfolio);
	app.get('/demos', routes.views.demos);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.all('/contact', routes.views.contact);

	// app.post('/send_email', function (req, res) {
	// 	console.log('hit route');
	// 	  var mailOpts, smtpTrans;
	// 	  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
	// 	  smtpTrans = nodemailer.createTransport('SMTP', {
	// 	      service: 'Gmail',
	// 	      auth: {
	// 	          user: "padmon29@gmail.com",
	// 	          pass: "blvsnrroqbfnhaaf" 
	// 	      }
	// 	  });
	// 	  console.log(req.body);
	// 	  //Mail options
	// 	  mailOpts = {
	// 	      from: req.body.sendername + ' &lt;' + req.body.emailaddress + '&gt;' + req.body.telephone, //grab form data from the request body object
	// 	      to: 'padmon29@gmail.com',
	// 	      subject: 'Kupa Dental email: '+req.body.sendersubject,
	// 	      text: 'From:'+req.body.sendername + '    Email: ' + req.body.emailaddress + '   Phone:' + req.body.telephone + '        Message:' +req.body.sendermessage
	// 	  };
	// 	  smtpTrans.sendMail(mailOpts, function (error, response) {
	// 	      console.log('send mail');
	// 	      //Email not sent
	// 	      if (error) {
	// 	          routes.views.contact
	// 	      }
	// 	      //Yay!! Email sent
	// 	      else {
	// 	          routes.views.contact	      
	// 	      }
	// 	  });
	// });
};
