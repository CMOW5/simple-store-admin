# Simple notification component

## this component show a simple notification modal with a message an a given color

###usage

1. import the component

import SimpleNotificatio from 'component_path/SimpleNotification';

2. add the component to the template

 <SimpleNotification
          show = {this.state.show}
          message = "an awesome message!!"
          type = 'info'
          onConfirmationButtonClicked = {this.handleConfimation}
          onCancelButtonClicked = {this.handleCancel}
  />

3. the component receives several properties
  * show = set this value to true if you want the modal to show up
  * message = the message to display in the modal
  * type = the type of modal to display. the options are
      - success => a green colored modal (default)
      - info => a light blue colored modal
      - danger => a red colored modal
  * onConfirmationButtonClicked => callback when the confirmation button is clicked
  * onCancelButtonClicked => callback when the cancel button is clicked
  