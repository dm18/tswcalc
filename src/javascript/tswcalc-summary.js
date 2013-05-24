function Summary() {
    self = this;

    this.updateAllStats = function() {
        primarySums = self.updatePrimaryStats();
        offensiveDefensiveSums = self.updateOffensiveDefensiveStats();
        return {
            primary: primarySums,
            offensive_defensive: offensiveDefensiveSums
        };
    };

    this.updatePrimaryStats = function() {
        var sums = {
            'hitpoints': 1970,
            'attack-rating': 0,
            'heal-rating': 0
        };
        var sumHitPoints = 1970;
        var sumAttackRating = 0;
        var sumHealRating = 0;
        for (var i = 0; i < template_data.slots.length; i++) {
            var role = $('#' + template_data.slots[i].id_prefix + '-role option:selected').attr('value');
            var ql = $('#' + template_data.slots[i].id_prefix + '-ql option:selected').attr('value');
            if (role == 'dps') {
                sums['attack-rating'] += custom_gear_data[template_data.slots[i].group].heal_dps['ql' + (ql)].rating;
            } else if (role == 'healer') {
                sums['heal-rating'] += custom_gear_data[template_data.slots[i].group].heal_dps['ql' + (ql)].rating;
            } else if (role == 'tank') {
                sums['hitpoints'] += custom_gear_data[template_data.slots[i].group].tank['ql' + (ql)].hitpoints;
            }
        }
        $('#stat-hitpoints').text(sums['hitpoints']);
        $('#stat-attack-rating').text(sums['attack-rating']);
        $('#stat-heal-rating').text(sums['heal-rating']);

        return sums;
    }

    this.updateOffensiveDefensiveStats = function() {
        var sums = {
            'critical-rating': 0,
            'critical-power': 0,
            'penetration-rating': 0,
            'hit-rating': 0,
            'block-rating': 0,
            'defense-rating': 0,
            'evade-rating': 0,
            'physical-protection': 249,
            'magical-protection': 249
        };

        for (var i = 0; i < template_data.slots.length; i++) {
            var glyphQl = $('#' + template_data.slots[i].id_prefix + '-glyph-ql option:selected').attr('value');
            var primaryGlyph = $('#' + template_data.slots[i].id_prefix + '-primary-glyph option:selected').attr('value');
            var secondaryGlyph = $('#' + template_data.slots[i].id_prefix + '-secondary-glyph option:selected').attr('value');

            if (primaryGlyph != "none" || secondaryGlyph != "none") {
                var primaryDist = $('#' + template_data.slots[i].id_prefix + '-primary-glyph-dist > button.btn.active')[0].innerHTML;
                var secondaryDist = $('#' + template_data.slots[i].id_prefix + '-secondary-glyph-dist > button.btn.active')[0].innerHTML;

                if (primaryDist != null || secondaryDist != null) {
                    var primaryValue = 0;
                    var secondaryValue = 0;
                    if (primaryGlyph != "none") {
                        primaryValue = glyph_data.stat[primaryGlyph].ql[glyphQl].slot[template_data.slots[i].group].dist[primaryDist];
                        sums[primaryGlyph] += primaryValue;
                        $('#' + template_data.slots[i].id_prefix + '-primary-glyph-value').html('+' + primaryValue);
                    } else {
                        $('#' + template_data.slots[i].id_prefix + '-primary-glyph-value').html('0');
                    }
                    if (secondaryGlyph != "none") {
                        secondaryValue = glyph_data.stat[secondaryGlyph].ql[glyphQl].slot[template_data.slots[i].group].dist[secondaryDist];
                        sums[secondaryGlyph] += secondaryValue;
                        $('#' + template_data.slots[i].id_prefix + '-secondary-glyph-value').html('+' + secondaryValue);
                    } else {
                        $('#' + template_data.slots[i].id_prefix + '-secondary-glyph-value').html('0');
                    }

                }
            } else {
                $('#' + template_data.slots[i].id_prefix + '-primary-glyph-value').html('0');
                $('#' + template_data.slots[i].id_prefix + '-secondary-glyph-value').html('0');
            }
        }
        self.updateStats(sums);
        return sums;
    };

    this.updateStats = function(sums) {
        for (var stat in sums) {
            if (sums.hasOwnProperty(stat)) {
                if (sums[stat] > 0) {
                    $('#stat-' + stat).html('+' + sums[stat]);
                } else {
                    $('#stat-' + stat).html("0");
                }
            }
        }
    };
};