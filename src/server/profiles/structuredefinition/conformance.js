const { generateSearchParamsForConformance } = require('../../utils/conformance.utils');
const { resolveFromVersion } = require('../../utils/resolve.utils');
const { routes } = require('./structuredefinition.config');

/**
 * @name exports
 * @summary Conformance statement
 */
module.exports = {
	profile: 'structuredefinition',
	resource: (version, count) => {
		let searchParams = generateSearchParamsForConformance(routes, version);
		let StructureDefinition = require(resolveFromVersion(version, 'base/StructureDefinition'));
		// Return our conformance statement
		return {
			extension: [{
				url: 'http://hl7api.sourceforge.net/hapi-fhir/res/extdefs.html#resourceCount',
				// This will be resolved dynamically by the service methods
				valueDecimal: count
			}],
			type: StructureDefinition.__resourceType,
			profile: {
				reference: 'http://hl7.org/fhir/structuredefinition.html'
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
