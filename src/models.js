window.c.models = (function(m){
  var contributionDetail = m.postgrest.model('contribution_details'),
  contributions = m.postgrest.model('contributions'),
  teamTotal = m.postgrest.model('team_totals'),
  projectDetail = m.postgrest.model('project_details'),
  projectContributionsPerDay = m.postgrest.model('project_contributions_per_day'),
  projectContributionsPerLocation = m.postgrest.model('project_contributions_per_location'),
  teamMember = m.postgrest.model('team_members');
  teamMember.pageSize(40);

  return {
    contributionDetail: contributionDetail,
    contributions: contributions,
    projectDetail: projectDetail,
    teamTotal: teamTotal,
    teamMember: teamMember,
    projectContributionsPerDay: projectContributionsPerDay,
    projectContributionsPerLocation: projectContributionsPerLocation
  };
}(window.m));
