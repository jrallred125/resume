$('#objectiveHeader').click(function(){
    $('#objective').toggle('slow');
});

$('#educationHeader').click(function(){
    $('#education').toggle('slow');
});

$('#projectsHeader').click(function(){
    $('#projects').toggle('slow');
});

$('#experienceHeader').click(function(){
    $('#experience').toggle('slow');
});

$('#skillsHeader').click(function(){
    $('#skills').toggle('slow');
});

var resumeData;
var greekedData;
var isGreeked = false;

$(document).on('click','#easterEgg',function(){
    if(!greekedData){
        $.getJSON('https://raw.githubusercontent.com/jrallred125/resume/master/greekedresume.json', function(data){
            displayFromJson(data);
            greekedData = data;
            isGreeked = !isGreeked;
        });
    }
    else if(isGreeked){
        displayFromJson(resumeData);
        isGreeked = !isGreeked;
    }
    else{
        displayFromJson(greekedData);
        isGreeked = !isGreeked;
    }

});

function displayInfo(info){
    // Step 1. Make a string to hold the information
    var infoStr = `<h1 title="This is who I am">`; 
    var nameStart = info.name.slice(0, info.name.length-1);
    var nameEnd = info.name.slice(info.name.length - 1, info.name.length); 
    infoStr += `${nameStart}<span id="easterEgg">${nameEnd}</span></h1>${info.email}<br><a href="${info.git}">Git</a> </p>`;
    // Step 2. Update the DOM 
    $('#information').html(infoStr);
}

function displayObjective(obj){
    // Update the DOM with the objective
    $('#objective').html(`<p>${obj}</p>`);
}

function displayEducation(ed){
    // Step 1. Make a string to hold the education information
    var edStr = `<p><b>${ed.degree}</b>, ${ed.date}<br>${ed.schoolName}, ${ed.location}<p><b>Projects</b></p>`;
    // Step 2. Make a string to hold the course list
    var projectsList = `<ul>`;
    // Step 3. Use a for of loop to get the courses
    for(var project of ed.projects){
        projectsList += `<li>${project}</li>`;
    }
    projectsList += `</ul>`;
    // Step 4. Updat the DOM with the course list
    $('#education').html(`${edStr}${projectsList}`);

}

function displayProjects(projects){
    var projectsList = `<ul>`;
    // Step 3. Use a for of loop to get the courses
    for(var project of ed.projects){
        projectsList += `<li>${project}</li>`;
    }
    projectsList += `</ul>`;
    $('#projects').html(`${projectsList}`);
}

function displayExperience(experience){ 
    // Step 1. Make a sting to hold the job information
    var jobsList =``;
    // Step 2. Use a for of loop to get the information
    for(var work of experience){
        jobsList += `<p><b>${work.title}, ${work.dates}</b><br>${work.companyName}, ${work.location}<ul>`;
        // Step 3. Use a for of loop to get the duties information
        for(var duty of work.duties){
            jobsList += `<li>${duty}</li>`;
        }
        jobsList += `</ul>`;
    }

    // Step 4. Update the DOM
    $('#experience').html(jobsList);
}

function displaySkills(skills){
    // Step 1. Make a string to hold the skill information
    var skillsList = `<ul>`;
    // Step 2. Use a for of loop to get the information
    for(var skill of skills){
        skillsList += `<li>${skill}</li>`;
    }
    skillsList += `</ul>`;
    // Step 3. Update the DOM
    $('#skills').html(skillsList); 
}

function displayFromJson(resume){
    displayInfo(resume.information);
    displayObjective(resume.objective);
    displayEducation(resume.education);
    displayProjects(resume.projects)
    displayExperience(resume.jobs);
    displaySkills(resume.skills);
}

$(function(){
    // Get my resume.json from git hub
    $.getJSON('https://raw.githubusercontent.com/jrallred125/resume/master/resume.json', function(data){
        displayFromJson(data);
        resumeData = data;
    });
});


