import Ember from 'ember';

export default Ember.Object.extend({
  user: undefined,
  isAnonymouse: Ember.computed.equal('user.provider', 'anonymous')
});
