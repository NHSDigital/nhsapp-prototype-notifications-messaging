// External dependencies
const express = require('express');
const router = express.Router();

// So I can see what's logging in the terminal
// This shows in the terminal what session data has been saved
router.use((req, res, next) => {
        const log = {
            method: req.method,
            url: req.originalUrl,
            data: req.session.data
        }
        console.log(JSON.stringify(log, null, 2))

    next ()
})

// Shows in the terminal what page we're on and what the previous page was
router.use('/', (req, res, next) => {
        res.locals.currentURL = req.originalUrl; 
        res.locals.prevUrl = req.get('Referrer');

    console.log('folder : ' + res.locals.folder + ',subfolder : ' + res.locals.subfolder  );

        next ();
});


// Flagging a message
router.post('/flag1', function(request, response) {
    request.session.data['message1-flagged'] = true;
    response.redirect('/pages/messages/message-1');
})

router.post('/flag2', function(request, response) {
    request.session.data['message2-flagged'] = true;
    response.redirect('/pages/messages/message-2');
})

router.post('/flag3', function(request, response) {
    request.session.data['message3-flagged'] = true;
    response.redirect('/pages/messages/message-3');
})

router.post('/flag4', function(request, response) {
    request.session.data['message4-flagged'] = true;
    response.redirect('/pages/messages/message-4');
})

// Unflagging a message
router.post('/unflag1', function(request, response) {
    request.session.data['message1-flagged'] = false;
    response.redirect('/pages/messages/message-1');
})

router.post('/unflag2', function(request, response) {
    request.session.data['message2-flagged'] = false;
    response.redirect('/pages/messages/message-2');
})

router.post('/unflag3', function(request, response) {
    request.session.data['message3-flagged'] = false;
    response.redirect('/pages/messages/message-3');
})

router.post('/unflag4', function(request, response) {
    request.session.data['message4-flagged'] = false;
    response.redirect('/pages/messages/message-4');
})

// Removing a message
router.post('/remove1', function(request, response) {
    request.session.data['message1-removed'] = true;
    request.session.data['message1-flagged'] = false;
    response.redirect('/pages/messages/your-messages');
});

router.post('/remove2', function(request, response) {
    request.session.data['message2-removed'] = true;
    request.session.data['message2-flagged'] = false;
    response.redirect('/pages/messages/your-messages');
});

router.post('/remove3', function(request, response) {
    request.session.data['message3-removed'] = true;
    request.session.data['message3-flagged'] = false;
    response.redirect('/pages/messages/your-messages');
});

router.post('/remove4', function(request, response) {
    request.session.data['message4-removed'] = true;
    request.session.data['message4-flagged'] = false;
    response.redirect('/pages/messages/your-messages');
});

// Restoring a message
router.post('/restore1', function(request, response) {
    request.session.data['message1-removed'] = false;
    response.redirect('/pages/messages/your-messages');
});

router.post('/restore2', function(request, response) {
    request.session.data['message2-removed'] = false;
    response.redirect('/pages/messages/your-messages');
});

router.post('/restore3', function(request, response) {
    request.session.data['message3-removed'] = false;
    response.redirect('/pages/messages/your-messages');
});

router.post('/restore4', function(request, response) {
    request.session.data['message4-removed'] = false;
    response.redirect('/pages/messages/your-messages');
});

// Message-1 gets
router.get('/pages/messages/message-1', function(request, response, next) {
    response.locals.is1Removed = request.session.data['message1-removed'];
    response.locals.is1Flagged = request.session.data['message1-flagged'];
    next();
});

// Message-2 gets
router.get('/pages/messages/message-2', function(request, response, next) {
    response.locals.is2Removed = request.session.data['message2-removed'];
    response.locals.is2Flagged = request.session.data['message2-flagged'];
    next();
});

// Message-3 gets
router.get('/pages/messages/message-3', function(request, response, next) {
    response.locals.is3Removed = request.session.data['message3-removed'];
    response.locals.is3Flagged = request.session.data['message3-flagged'];
    next();
});

// Message-4 gets
router.get('/pages/messages/message-4', function(request, response, next) {
    response.locals.is4Removed = request.session.data['message4-removed'];
    response.locals.is4Flagged = request.session.data['message4-flagged'];
    next();
});

// Your-messages gets
router.get('/pages/messages/your-messages', function(request, response, next) {
    response.locals.is1Removed = request.session.data['message1-removed'];
    response.locals.is2Removed = request.session.data['message2-removed'];
    response.locals.is3Removed = request.session.data['message3-removed'];
    response.locals.is4Removed = request.session.data['message4-removed'];
    response.locals.is1Flagged = request.session.data['message1-flagged'];
    response.locals.is2Flagged = request.session.data['message2-flagged'];
    response.locals.is3Flagged = request.session.data['message3-flagged'];
    response.locals.is4Flagged = request.session.data['message4-flagged'];
    next();
});

// Removed-messages gets
router.get('/pages/messages/removed-messages', function(req, res) {
    res.render('pages/messages/removed-messages', {
        is1Removed: req.session.data['message1-removed'],
        is1Flagged: req.session.data['message1-flagged'],
        is2Removed: req.session.data['message2-removed'],
        is2Flagged: req.session.data['message2-flagged'],
        is3Removed: req.session.data['message3-removed'],
        is3Flagged: req.session.data['message3-flagged'],
        is4Removed: req.session.data['message4-removed'],
        is4Flagged: req.session.data['message4-flagged'],
        data: req.session.data,
        query: req.query
    });
});

// GP Appointments - Appointment type
router.post('/pages/services/gp-appointment-type-answer', function (req, res) {

  var install = req.session.data['gp-appointment-type']

  if (install == "Routine GP"){
    res.redirect('/pages/services/gp-appointment-select-appointment-v4')
  } else if (install == "none") {
    res.redirect('/pages/services/gp-appointment-type')
  } else {
    res.redirect('/pages/services/gp-appointment-invite')
  }
})

// GP Appointments - Invited to this appointment?
router.post('/pages/services/gp-appointment-invite-answer', function (req, res) {

  var install = req.session.data['gp-appointment-invite']

  if (install == "No"){
    res.redirect('/pages/services/gp-appointment-type-not-available')
  } else {
    res.redirect('/pages/services/gp-appointment-select-appointment-v4')
  }
})

// Adding "query" to every page. There could be a better implementaion using middleware. 
// in nunjkucks you can call {{query[key]}}

router.get('*', function(req, res) {
    let path = req.params[0]
    let pathEnd = path.slice(-1)
    let newPath = path.substring(1)
    if (path == "/") {
      // Top home page
      path = "index"
    } else if (pathEnd == "/") {
      // Check if this is the route folder, if so, then render the index page.
      path = newPath + "index"
    } else {
      path = newPath
    }
    res.render(path, {
      "query": req.query,
    });
  })

module.exports = router;