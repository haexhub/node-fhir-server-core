const { generateSearchParamsForConformance } = require('../../utils/conformance.utils');
const { resolveFromVersion } = require('../../utils/resolve.utils');
const { routes } = require('./flag.config');

/**
 * @name exports
 * @summary Conformance statement
 */
module.exports = {
	profile: 'flag',
	resource: (version, count) => {
		let searchParams = generateSearchParamsForConformance(routes, version);
		let Flag = require(resolveFromVersion(version, 'base/Flag'));
		// Return our conformance statement
		return {
			extension: [{
				url: 'http://hl7api.sourceforge.net/hapi-fhir/res/extdefs.html#resourceCount',
				// This will be resolved dynamically by the service methods
				valueDecimal: count
			}],
			type: Flag.__resourceType,
			profile: {
				reference: 'http://hl7.org/fhir/flag.html'
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
