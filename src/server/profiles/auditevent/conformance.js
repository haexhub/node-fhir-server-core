const { generateSearchParamsForConformance } = require('../../utils/conformance.utils');
const { resolveFromVersion } = require('../../utils/resolve.utils');
const { routes } = require('./auditevent.config');

/**
 * @name exports
 * @summary Conformance statement
 */
module.exports = {
	profile: 'auditevent',
	resource: (version, count) => {
		let searchParams = generateSearchParamsForConformance(routes, version);
		let AuditEvent = require(resolveFromVersion(version, 'base/AuditEvent'));
		// Return our conformance statement
		return {
			extension: [{
				url: 'http://hl7api.sourceforge.net/hapi-fhir/res/extdefs.html#resourceCount',
				// This will be resolved dynamically by the service methods
				valueDecimal: count
			}],
			type: AuditEvent.__resourceType,
			profile: {
				reference: 'http://hl7.org/fhir/auditevent.html'
			},
			interaction: [{
				code: 'read'
			}, {
				code: 'search'
			}],
			searchParam: searchParams
		};
	}
};
