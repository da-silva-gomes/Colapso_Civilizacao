const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');
const { Board, Led } = require("johnny-five");
const board = new Board();
let led;

// Create a simple demo sequece that calls various
// five.Led methods with specified arguments and
// let it run for the given duration (defaults to 3 seconds).
const demoSequence = [
  {
    method: "pulse",
  },
  {
    method: "strobe",
    args: [500],
    duration: 3000
  },
  {
    method: "fadeIn",
    args: [
      2000,
      () => {
        console.log("fadeIn complete!");
      }
    ],
    duration: 2500
  },
  {
    method: "fadeOut",
    args: [
      5000,
      () => {
        console.log("fadeOut complete!");
      }
    ],
    duration: 5500
  },
  {
    method: "brightness",
    args: [10],
    duration: 3000
  },
  {
    method: "off"
  }
];

app.listen(8000);

let isOn = false;

// function for serving the static HTML page
function handler(request, response) {
  response.writeHead(200);
  response.end();

  if (request.url === '/?action=soundOn') {
    isOn = true;
    led.stop();
    execute(0);
  } else {
    isOn = false;
    led.stop();
    execute(5);
  }
}


// Execute a method in the demo sequence
function execute(step) {
  // Grab everything we need for this step
  const method = demoSequence[step].method;
  const args = demoSequence[step].args;
  const duration = demoSequence[step].duration || 3000;

  // Just print out what we're executing
  console.log("led." + method + "(" + (args ? args.join() : "") + ")");

  // Make the actual call to the LED
  Led.prototype[method].apply(led, args);

  // Recursively call the next step after specified duration

  board.wait(duration, () => {
    if(isOn) {
      execute(step);
    }
  });
}

board.on("ready", () => {
  // Defaults to pin 11 (must be PWM)
  led = new Led(process.argv[2] || 11);
});
