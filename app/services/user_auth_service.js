/**
 * Created by stone on 11.10.2014.
 */
var Person = function (name) {
    this._name = name;
    this._tokenValid = false;
};
var AuthService = module.exports = {
    persons: [],
    add: function (person) {
        persons.push(person);
    },
    remove: function (name) {
        persons.filter(function (person) {
            return name === person._name;
        }
    },
    isValid: function (name) {
        persons.filter(function (person) {
            if (name === person._name) {
                return person._tokenValid;
            }
        }
    },
    setValid: function (name) {
        persons.filter(function (person) {
            if (name === person._name) {
                person._tokenValid = true;
            }
        };
    }
}