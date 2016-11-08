var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Cordova, CordovaInstance, InstanceProperty, Plugin } from './plugin';
/**
 * @private
 */
export var Contact = (function () {
    function Contact() {
        this._objectInstance = navigator.contacts.create();
    }
    Object.defineProperty(Contact.prototype, "id", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "displayName", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "name", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "nickname", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "phoneNumbers", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "emails", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "addresses", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "ims", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "organizations", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "birthday", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "note", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "photos", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "categories", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "urls", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Contact.prototype.clone = function () {
        var newContact = new Contact();
        for (var prop in this) {
            if (prop === 'id')
                return;
            newContact[prop] = this[prop];
        }
        return newContact;
    };
    Contact.prototype.remove = function () { return; };
    Contact.prototype.save = function () { return; };
    __decorate([
        InstanceProperty
    ], Contact.prototype, "id", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "displayName", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "name", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "nickname", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "phoneNumbers", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "emails", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "addresses", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "ims", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "organizations", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "birthday", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "note", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "photos", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "categories", null);
    __decorate([
        InstanceProperty
    ], Contact.prototype, "urls", null);
    __decorate([
        CordovaInstance()
    ], Contact.prototype, "remove", null);
    __decorate([
        CordovaInstance()
    ], Contact.prototype, "save", null);
    return Contact;
}());
/**
 * @private
 */
export var ContactName = (function () {
    function ContactName(formatted, familyName, givenName, middleName, honorificPrefix, honorificSuffix) {
        this._objectInstance = new window.ContactName(formatted, familyName, givenName, middleName, honorificPrefix, honorificSuffix);
    }
    Object.defineProperty(ContactName.prototype, "formatted", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactName.prototype, "familyName", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactName.prototype, "givenName", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactName.prototype, "middleName", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactName.prototype, "honorificPrefix", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactName.prototype, "honorificSuffix", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        InstanceProperty
    ], ContactName.prototype, "formatted", null);
    __decorate([
        InstanceProperty
    ], ContactName.prototype, "familyName", null);
    __decorate([
        InstanceProperty
    ], ContactName.prototype, "givenName", null);
    __decorate([
        InstanceProperty
    ], ContactName.prototype, "middleName", null);
    __decorate([
        InstanceProperty
    ], ContactName.prototype, "honorificPrefix", null);
    __decorate([
        InstanceProperty
    ], ContactName.prototype, "honorificSuffix", null);
    return ContactName;
}());
/**
 * @private
 */
export var ContactField = (function () {
    function ContactField(type, value, pref) {
        this._objectInstance = new window.ContactField(type, value, pref);
    }
    Object.defineProperty(ContactField.prototype, "type", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactField.prototype, "value", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactField.prototype, "pref", {
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        InstanceProperty
    ], ContactField.prototype, "type", null);
    __decorate([
        InstanceProperty
    ], ContactField.prototype, "value", null);
    __decorate([
        InstanceProperty
    ], ContactField.prototype, "pref", null);
    return ContactField;
}());
/**
 * @private
 */
export var ContactAddress = (function () {
    function ContactAddress(pref, type, formatted, streetAddress, locality, region, postalCode, country) {
        this._objectInstance = new window.ContactAddress(pref, type, formatted, streetAddress, locality, region, postalCode, country);
    }
    Object.defineProperty(ContactAddress.prototype, "pref", {
        /** Set to true if this ContactAddress contains the user's preferred value. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "type", {
        /** A string indicating what type of field this is, home for example. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "formatted", {
        /** The full address formatted for display. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "streetAddress", {
        /** The full street address. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "locality", {
        /** The city or locality. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "region", {
        /** The state or region. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "postalCode", {
        /** The zip code or postal code. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactAddress.prototype, "country", {
        /** The country name. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        InstanceProperty
    ], ContactAddress.prototype, "pref", null);
    __decorate([
        InstanceProperty
    ], ContactAddress.prototype, "type", null);
    __decorate([
        InstanceProperty
    ], ContactAddress.prototype, "formatted", null);
    __decorate([
        InstanceProperty
    ], ContactAddress.prototype, "streetAddress", null);
    __decorate([
        InstanceProperty
    ], ContactAddress.prototype, "locality", null);
    __decorate([
        InstanceProperty
    ], ContactAddress.prototype, "region", null);
    __decorate([
        InstanceProperty
    ], ContactAddress.prototype, "postalCode", null);
    __decorate([
        InstanceProperty
    ], ContactAddress.prototype, "country", null);
    return ContactAddress;
}());
/**
 * @private
 */
export var ContactOrganization = (function () {
    function ContactOrganization() {
        this._objectInstance = new window.ContactOrganization();
    }
    Object.defineProperty(ContactOrganization.prototype, "pref", {
        /** Set to true if this ContactOrganization contains the user's preferred value. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactOrganization.prototype, "type", {
        /** A string that indicates what type of field this is, home for example. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactOrganization.prototype, "name", {
        /** The name of the organization. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactOrganization.prototype, "department", {
        /** The department the contract works for. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactOrganization.prototype, "title", {
        /** The contact's title at the organization. */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        InstanceProperty
    ], ContactOrganization.prototype, "pref", null);
    __decorate([
        InstanceProperty
    ], ContactOrganization.prototype, "type", null);
    __decorate([
        InstanceProperty
    ], ContactOrganization.prototype, "name", null);
    __decorate([
        InstanceProperty
    ], ContactOrganization.prototype, "department", null);
    __decorate([
        InstanceProperty
    ], ContactOrganization.prototype, "title", null);
    return ContactOrganization;
}());
/**
 * @private
 */
export var ContactFindOptions = (function () {
    function ContactFindOptions() {
        this._objectInstance = new window.ContactFindOptions();
    }
    Object.defineProperty(ContactFindOptions.prototype, "filter", {
        /**
         * The search string used to find navigator.contacts. (Default: "")
         */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactFindOptions.prototype, "multiple", {
        /**
         * Determines if the find operation returns multiple navigator.contacts. (Default: false)
         */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactFindOptions.prototype, "desiredFields", {
        /**
         * Contact fields to be returned back. If specified, the resulting Contact object only features values for these fields.
         */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactFindOptions.prototype, "hasPhoneNumber", {
        /**
         * (Android only): Filters the search to only return contacts with a phone number informed.
         */
        get: function () { return; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        InstanceProperty
    ], ContactFindOptions.prototype, "filter", null);
    __decorate([
        InstanceProperty
    ], ContactFindOptions.prototype, "multiple", null);
    __decorate([
        InstanceProperty
    ], ContactFindOptions.prototype, "desiredFields", null);
    __decorate([
        InstanceProperty
    ], ContactFindOptions.prototype, "hasPhoneNumber", null);
    return ContactFindOptions;
}());
/**
 * @name Contacts
 * @description
 * Access and manage Contacts on the device.
 *
 * @usage
 *
 * ```typescript
 * import { Contact } from 'ionic-native';
 *
 *
 * let contact = new Contact();
 * contact.displayName = 'Mr. Ionitron';
 * contact.save().then(
 *   () => console.log('Contact saved!', contact),
 *   (error: any) => console.error('Error saving contact.', error)
 * );
 * ```
 * @interfaces
 * IContactProperties
 * @classes
 * ContactFindOptions
 * ContactOrganization
 * ContactAddress
 */
export var Contacts = (function () {
    function Contacts() {
    }
    /**
     * Create a single contact.
     * @return Returns a object Contact
     */
    Contacts.create = function () {
        return new Contact();
    };
    /**
     * Search for contacts in the Contacts list.
     * @param fields {string[]}  Contact fields to be used as a search qualifier.
     *  A zero-length contactFields parameter is invalid and results in ContactError.INVALID_ARGUMENT_ERROR.
     *  A contactFields value of "*" searches all contact fields.
     *
     * @param options {Object} the options to query with:
     *   filter: The search string used to find navigator.contacts. (string) (Default: "")
     *   multiple: Determines if the find operation returns multiple navigator.contacts. (Boolean) (Default: false)
     *   desiredFields: Contact fields to be returned back. If specified, the resulting Contact object only features values for these fields. (DOMString[]) [Optional]
     *   hasPhoneNumber(Android only): Filters the search to only return contacts with a phone number informed. (Boolean) (Default: false)
     *
     * @return Returns a Promise that resolves with the search results (an array of Contact objects)
     */
    Contacts.find = function (fields, options) { return; };
    /**
     * Select a single Contact.
     * @return Returns a Promise that resolves with the selected Contact
     */
    Contacts.pickContact = function () { return; };
    __decorate([
        Cordova({
            successIndex: 1,
            errorIndex: 2
        })
    ], Contacts, "find", null);
    __decorate([
        Cordova()
    ], Contacts, "pickContact", null);
    Contacts = __decorate([
        Plugin({
            plugin: 'cordova-plugin-contacts',
            pluginRef: 'navigator.contacts',
            repo: 'https://github.com/apache/cordova-plugin-contacts'
        })
    ], Contacts);
    return Contacts;
}());
//# sourceMappingURL=contacts.js.map