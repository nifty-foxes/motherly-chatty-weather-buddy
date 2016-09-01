function fahrenheitToString(temp) {
	if(temp > 101) return 'sizzling';
	if(temp > 86) return 'hot';
	if(temp > 73) return 'warm';
	if(temp > 51) return 'chilly';
	if(temp > 33) return 'cold';
	if(temp > -70) return 'freezing';
	return 'incomprehensible';
}

exports.fahrenheitToString = fahrenheitToString;