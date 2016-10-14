import mousetrap from 'mousetrap'

import {
  openSearchDialog,
  closeSearchDialog,
} from './actions/uiActions'


export default function setup(Store) {
  Mousetrap.bind(['command+enter', 'ctrl+enter'], function(e) {
      if (Store.getState().ui.searchDialog.open) {
        Store.dispatch(closeSearchDialog())
      } else {
        Store.dispatch(openSearchDialog())
      }
      return false;
  });
}
