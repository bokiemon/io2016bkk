self.addEventListener('push', function(event){
  //console.log("push message receive: ", event);
  event.waitUntil(

    fetch("https://angularfire-5f9c1.firebaseio.com/notifications/message/.json")
    .then(
      function(response){
        if(response.status !== 200) {
          console.log("Looks like there's a error retrieve notification")
          throw new Error();
        }

        return response.json().then(function(data) {
          console.log("data: ", data);

          self.registration.showNotification(data.title, {
            body: data.message,
            tag: 'my-tag',
            icon: 'myicon'
          });
        })
      }
    )
  ) 
});