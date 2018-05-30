const { generateSearchParamsForConformance } = require('../../utils/conformance.utils');
const { resolveFromVersion } = require('../../utils/resolve.utils');
const { routes } = require('./researchstudy.config');

/**
 * @name exports
 * @summary Conformance statement
 */
module.exports = {
	profile: 'researchstudy',
	resource: (version, count) => {
		let searchParams = generateSearchParamsForConformance(routes, version);
		let ResearchStudy = require(resolveFromVersion(version, 'base/ResearchStudy'));
		// Return our conformance statement
		return {
			extension: [{
				url: 'http://hl7api.sourceforge.net/hapi-fhir/res/extdefs.html#resourceCount',
				// This will be resolved dynamically by the service methods
				valueDecimal: count
			}],
			type: ResearchStudy.__resourceType,
			profile: {
				reference: 'http://hl7.org/fhir/researchstudy.html'
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
