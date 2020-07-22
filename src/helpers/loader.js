import $ from 'cash-dom';

export const startLoader = () => {
  $('#spinner').removeClass('is-hidden');
}

export const stopLoader = () => {
  $('#spinner').addClass('is-hidden');
}