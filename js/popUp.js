(function($) {
  $.fn.popUp = function(options) {
    const modalCss = {
      'z-index': '1100',
      'border-radius': '5px',
      'background': '#e3e3e3',
      'width': '25vmax',
      'padding': '10px',
      'position': 'fixed',
      'top': '50%',
      'left': '50%',
      'transform': 'translate(-50%, -50%)',
    };

    const overlayCss = {
      'z-index': '1050',
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'width': '100%',
      'height': '100%',
      'background': 'rgba(0,0,0,0.75)',
      'cursor': 'pointer',
    };

    const settings = $.extend({
      isCancel: true,
      type: 'info',
      isBubble: false,
    }, options);

    function createOverlay() {
      const overlayDiv = $('<div></div>').attr('id', 'overlay').css(
          overlayCss);
      return overlayDiv;
    }

    function createPopUp() {
      const modal = $('<div></div>').addClass('wrapper').attr('id',
          'pop-up').css(modalCss);
      const modalDialog = $('<div></div>').addClass('wrapper-dialog').css(
          'width', '100%');
      const modalContent = $('<div></div>').addClass('wrapper-content');
      const modalHeader = $('<div></div>').addClass('modal-header');
      const modalTitle = $('<h5></h5>').addClass('modal-title');
      switch (settings.type) {
        case 'success':
          modalTitle.css('color', 'green').text('Some success message');
          break;
        case 'error':
          modalTitle.css('color', 'red').text('Some error message');
          break;
        case 'info':
          modalTitle.css('color', 'blue').text('Some info message');
          break;
        default:
          modalTitle.css('color', 'black').text(
              'Modal title');
      };
      const button = $('<button></button>').addClass('btn-close').attr(
          'id', 'btn-close');
      const modalBody = $('<div></div>').addClass('modal-body');
      const p = $('<p></p>').text(settings.text);
      const modalFooter = $('<div></div>').addClass('modal-footer');
      const buttonCancel = settings.isCancel ? $('<button></button>').addClass(
          'btn btn-secondary').attr('id', 'btn-cancel').text('Cancel') :
        null;
      const buttonOk = $('<button></button>').addClass(
          'btn btn-primary').attr('id', 'btn-ok').text('OK');
      modalHeader.append(modalTitle).append(button);
      modalBody.append(p);
      modalFooter.append(buttonCancel).append(buttonOk);
      modalContent.append(modalHeader).append(modalBody).append(
          modalFooter);
      modalDialog.append(modalContent);
      modal.append(modalDialog);
      return modal;
    }

    function addListiners(isCancelExsist) {
      const idToggle = isCancelExsist ? '#btn-cancel, #btn-close' :
        '#overlay, #btn-close';
      $(idToggle).click(() => $(
          '#overlay, #pop-up').remove());
      $(' #btn-ok').click(() => {
        console.log('Here func for post removement');
        $('#overlay, #pop-up').remove();
      });
      $('body').on('keyup', (event) => event.keyCode === 27 ? $(
          '#overlay, #pop-up').remove() : null);
    }

    function showPopUp(target) {
      if (settings.isBubble) {
        const delay = 10000;
        setTimeout(() => {
          $('body').append(createOverlay()).append(createPopUp());
          addListiners(settings.isCancel);
        }, delay);
        return;
      }

      target.click(function(event) {
        if ($(event.target).hasClass('delete')) {
          event.preventDefault();
          $(this).append(createOverlay()).append(createPopUp());
          addListiners(settings.isCancel);
        }
      });
    };

    this.each(function() {
      showPopUp($(this));
    });

    return this;
  };
})(jQuery);
