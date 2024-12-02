let maindiv = (document.getElementById('pannelcreate'));
function activity1() {
    let text = `
    <div class='divide'>
        <div style='margin-top: 2vw;'>
            <br>
            <h4 class="center-text fs-20px fw-600">Dynamic & Kinematic Viscosity</h4>
            <br>
            <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
        </div>
    </div>`;
    maindiv.innerHTML = text;
    setTimeout(() => {
        MathJax.typeset();
    }, 300);
    internal_calculation1();
}
function start_act1() {
    let temp_btn = (document.getElementById('temp-btn-1'));
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text('Activity 1', 'act1-div');
    let text = `
   ${btn_text}
   <div class='collapse center-text divide fs-18px fb-500' id='act1-div'>
      <p style="text-align:left;">
         Find shear stress at y=0 and y=0.25
      </p>
      <p style="text-align:left;">
         The velocity distribution over plate is given by
      </p>
      <p>
         $$
            u = \\frac{2}{3}y - \\frac{1}{2}y^2
         $$
      </p>

      <p style="text-align:left;">
         Dynamic viscosity = ${dyn_vis} poise
      </p>

      <p style="text-align:left;">
         Find kinematic viscosity also if density of liquid is ${dens} kg/m<sup>3</sup>
      </p>

      <div id="du-div">
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-3">
               $$ \\frac{du}{dy} =  $$
            </div>
            <div class=" row col-md-8 justify-content-center" style="text-align:center;">
               <input type='text' style="margin:0 auto; width:40%" id='du-inp1' class='form-control fs-16px' /> 
               -
               <input type='text' style="margin:0 auto; width:40%" id='du-inp2' class='form-control fs-16px' />
            </div>
         </div>
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-4">
               $$ \\left(\\frac{du}{dy}\\right)_{y=0} =  $$
            </div>
            <div class="col-md-4">
               <input type='number' style="margin:0 auto; width:80%" id='du-0-inp' class='form-control fs-16px' />
            </div>
         </div>
         <div class="row justify-content-center" style="align-items:center;">
            <div class="col-md-4">
               $$ \\left(\\frac{du}{dy}\\right)_{y=0.25} =  $$
            </div>
            <div class="col-md-4">
               <input type='number' style="margin:0 auto; width:80%" id='du-025-inp' class='form-control fs-16px' />
            </div>
         </div>
         <br>
         <button class='btn btn-info btn-sm std-btn' onclick='verify_du();' id='act1-btn1'>Verify</button>
      </div>
   </div>`;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
    setTimeout(() => {
        show_step('act1-div');
    }, 150);
}
function internal_calculation1() {
    dyn_vis = 0;
    dens = 0;
    du_0 = 0;
    du_025 = 0;
    vis_nsm2 = 0;
    sh_st0 = 0;
    sh_st025 = 0;
    kin_vis = 0;
    kin_vis_stoke = 0;
    dyn_vis = parseFloat(random(8, 9).toFixed(2));
    dens = random1(700, 801);
    du_0 = 2 / 3;
    du_025 = 2 / 3 - 0.25;
    vis_nsm2 = (1 / 10) * dyn_vis;
    sh_st0 = vis_nsm2 * du_0;
    sh_st025 = vis_nsm2 * du_025;
    kin_vis = dyn_vis / dens;
    kin_vis_stoke = kin_vis * Math.pow(10, 4);
}
function verify_du() {
    let inp1 = (document.getElementById('du-inp1'));
    let inp2 = (document.getElementById('du-inp2'));
    let du_0_inp = (document.getElementById('du-0-inp'));
    let du_025_inp = (document.getElementById('du-025-inp'));
    console.log(0.667, 'y');
    console.log(du_0, du_025);
    let fractionRegex = /^\d+\/\d+$/;
    let decimalRegex = /^\d+(\.\d+)?$/;
    let decimalValue;
    if (fractionRegex.test(inp1.value)) {
        let parts = inp1.value.split('/');
        let numerator = parseInt(parts[0]);
        let denominator = parseInt(parts[1]);
        decimalValue = numerator / denominator;
    }
    else if (decimalRegex.test(inp1.value)) {
        decimalValue = parseFloat(inp1.value);
    }
    if (!verify_values(decimalValue, 0.6666666)) {
        inp1.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp1.style.border = '1px solid #ced4da';
        inp1.disabled = true;
    }
    if (inp2.value != 'y') {
        inp2.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        inp2.style.border = '1px solid #ced4da';
        inp2.disabled = true;
    }
    if (!verify_values(parseFloat(du_0_inp.value), du_0)) {
        du_0_inp.style.border = '1px solid red';
        alert('Incorrect du/dy at y=0 value');
        return;
    }
    else {
        du_0_inp.style.border = '1px solid #ced4da';
        du_0_inp.disabled = true;
    }
    if (!verify_values(parseFloat(du_025_inp.value), du_025)) {
        du_025_inp.style.border = '1px solid red';
        alert('Incorrect du/dy at y=0.25 value');
        return;
    }
    else {
        du_025_inp.style.border = '1px solid #ced4da';
        du_025_inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = document.getElementById('du-div');
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         $$
            \\frac{du}{dy} = \\frac{2}{3} - y
         $$
      </p>
      <div class="row justify-content-center">
         <div class="col-md-4">
            $$
               \\left(\\frac{du}{dy}\\right)_{y=0} = ${parseFloat(du_0.toFixed(4))}
            $$
         </div>
         <div class="col-md-4">
            $$
               \\left(\\frac{du}{dy}\\right)_{y=0.25} = ${parseFloat(du_025.toFixed(4))}
            $$
         </div>
      </div>
      <br>
      <button class='btn btn-info btn-sm std-btn' onclick='load_viscosity_in_nsm();' id='act1-btn2'>Next</button>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function load_viscosity_in_nsm() {
    let btn = (document.getElementById('act1-btn2'));
    btn && btn.remove();
    let div = (document.getElementById('act1-div'));
    div.innerHTML += `
   <br>
   <p>
      Viscosity in N-s/m<sup>2</sup> = <span style="display:inline-block;"> $$ \\frac{1}{10} \\times$$ </span> viscosity in poise
   </p>
   <div id="viscosity-nsm-div">
      <div class="row justify-content-center" style="align-items:center">
         <div class="col-md-4">
            Viscosity in N-s/m<sup>2</sup> = 
         </div>
         <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
            <input type='number' style="margin:0 5px; width:60%" id='vis-nsm-inp' class='form-control fs-16px' /> <span style="display:contents;">N-s/m<sup>2</sup></span>
         </div>
      </div>
      <br>
      <button class='btn btn-info btn-sm std-btn' onclick='verify_vis_nsm();'>Verify</button>
   </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function verify_vis_nsm() {
    let nsm_inp = (document.getElementById('vis-nsm-inp'));
    console.log(vis_nsm2);
    if (!verify_values(parseFloat(nsm_inp.value), vis_nsm2)) {
        nsm_inp.style.border = '1px solid red';
        alert('Incorrect value');
        return;
    }
    else {
        nsm_inp.style.border = '1px solid #ced4da';
        nsm_inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('viscosity-nsm-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p>
         Viscosity in N-s/m<sup>2</sup> = ${parseFloat(vis_nsm2.toFixed(3))} N-s/m<sup>2</sup>
      </p>
      <br>
      <button class='btn btn-info btn-sm std-btn' onclick='load_shear_stress_div();' id='act1-btn3'>Next</button>
   `;
}
function load_shear_stress_div() {
    let btn = (document.getElementById('act1-btn3'));
    btn && btn.remove();
    let div = (document.getElementById('act1-div'));
    div.innerHTML += `
   <br>
   <div id="shear-stress-div">
      <p style="text-align:left;">
         Shear Stress at y=0
      </p>
      <div class="row justify-content-center" style="align-items:center;">
         <div class="col-md-4">
            $$ (\\tau)_{y=0} = \μ \× \\left(\\frac{du}{dy}\\right)_{y=0} =   $$
         </div>
         <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
            <input type='number' style="margin:0 auto; width:80%" id='sh-st-0-inp' class='form-control fs-16px' /> <span style="display:contents;">N/m<sup>2</sup></span>
         </div>
      </div>
      <p style="text-align:left;">
         Shear Stress at y=0.25
      </p>
      <div class="row justify-content-center" style="align-items:center;">
         <div class="col-md-4">
            $$ (\\tau)_{y=0.25} = \μ \× \\left(\\frac{du}{dy}\\right)_{y=0.25} =   $$
         </div>
         <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
            <input type='number' style="margin:0 auto; width:80%" id='sh-st-025-inp' class='form-control fs-16px' /> <span style="display:contents;">N/m<sup>2</sup></span>
         </div>
      </div>
      <br>
      <button class='btn btn-info btn-sm std-btn' onclick='verify_shear_stress();'>Verify</button>
   </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function verify_shear_stress() {
    let shear_0 = (document.getElementById('sh-st-0-inp'));
    let shear_025 = (document.getElementById('sh-st-025-inp'));
    console.log(sh_st0, sh_st025);
    if (!verify_values(parseFloat(shear_0.value), sh_st0)) {
        shear_0.style.border = '1px solid red';
        alert('Incorrect value for shear stress at y=0');
        return;
    }
    else {
        shear_0.style.border = '1px solid #ced4da';
        shear_0.disabled = true;
    }
    if (!verify_values(parseFloat(shear_025.value), sh_st025)) {
        shear_025.style.border = '1px solid red';
        alert('Incorrect value shear stress at y=0.25');
        return;
    }
    else {
        shear_025.style.border = '1px solid #ced4da';
        shear_025.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('shear-stress-div'));
    div.innerHTML = '';
    div.innerHTML = `
      <p style="text-align:left;">
         Shear Stress at y=0
      </p>
      <p>
         $$
            (\\tau)_{y=0} = \μ \× \\left(\\frac{du}{dy}\\right)_{y=0} = ${parseFloat(sh_st0.toFixed(4))} \\ N/m^2
         $$
      </p>
      <p style="text-align:left;">
         Shear Stress at y=0.25
      </p>
      <p>
         $$ 
            (\\tau)_{y=0.25} = \μ \× \\left(\\frac{du}{dy}\\right)_{y=0.25} = ${parseFloat(sh_st025.toFixed(4))} \\ N/m^2
         $$
      </p>
      <br>
      <button class='btn btn-info btn-sm std-btn' onclick='load_kinematic_viscosity();' id='act1-btn4'>Next</button>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function load_kinematic_viscosity() {
    let btn = (document.getElementById('act1-btn4'));
    btn && btn.remove();
    let div = (document.getElementById('act1-div'));
    div.innerHTML += `
   <br>
   <p>
      $$
         Kinematic \\ \\ viscosity (\\nu) = \\frac{dynamic \\ \\ viscosity}{density}   
      $$
   </p>
   <div id="kin-vis-div">
      <div class="row justify-content-center " style="align-items:center;">
         <div class="col-md-4">
            $$ \ν  =  $$
         </div>
         <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
            <input type='number' style="margin:0 auto; width:80%" id='kin-vis-inp' class='form-control fs-16px' /> <span style="display:contents;">m<sup>2</sup>/s</span>
         </div>
      </div>
      <button class='btn btn-info btn-sm std-btn' onclick='verify_kinematic_viscosity();'>Verify</button>
   </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function verify_kinematic_viscosity() {
    let kin_vis_inp = (document.getElementById('kin-vis-inp'));
    console.log(kin_vis);
    if (!verify_values(parseFloat(kin_vis_inp.value), kin_vis)) {
        kin_vis_inp.style.border = '1px solid red';
        alert('Incorrect kinematic viscosity value');
        return;
    }
    else {
        kin_vis_inp.style.border = '1px solid #ced4da';
        kin_vis_inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('kin-vis-div'));
    div.innerHTML = '';
    div.innerHTML = `
   <p>
      $$
         \ν = ${parseFloat(kin_vis.toFixed(4))}\\  m^2/s
      $$
   </p>
   <button class='btn btn-info btn-sm std-btn' onclick='load_kinematic_viscosity_stoke();' id='act1-btn5'>Next</button>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function load_kinematic_viscosity_stoke() {
    let btn = (document.getElementById('act1-btn5'));
    btn && btn.remove();
    let div = (document.getElementById('act1-div'));
    div.innerHTML += `
   <br>
   <p>
      $$
         \ν \\ in \\ stoke = \ν \\ in \\ m^2/s\× 10^4
      $$
   </p>
   <div id="kin-vis-stoke-div">
      <div class="row justify-content-center" style="align-items:center;">
         <div class="col-md-4">
            $$ \ν \\ in \\ stoke =  $$
         </div>
         <div class="row justify-content-center col-md-4" style="flex-wrap:nowrap; align-items:center;">
            <input type='number' style="margin:0 auto; width:70%" id='kin-vis-stoke-inp' class='form-control fs-16px' /> <span style="display:contents;">stoke</span>
         </div>
      </div>
      <button class='btn btn-info btn-sm std-btn' onclick='verify_kinematic_viscosity_stoke();'>Verify</button>
   </div>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function verify_kinematic_viscosity_stoke() {
    let inp = (document.getElementById('kin-vis-stoke-inp'));
    console.log(kin_vis_stoke);
    if (!verify_values(parseFloat(inp.value), kin_vis_stoke)) {
        inp.style.border = '1px solid red';
        alert('Incorrect kinematic viscosity in stoke value');
        return;
    }
    else {
        inp.style.border = '1px solid #ced4da';
        inp.disabled = true;
    }
    alert('Great!! Your calculation is correct.');
    let div = (document.getElementById('kin-vis-stoke-div'));
    div.innerHTML = '';
    div.innerHTML = `
   <p>
      $$
         \ν \\ in \\ stoke = ${parseFloat(kin_vis_stoke.toFixed(4))}\\ stoke
      $$
   </p>
   <button class='btn btn-info btn-sm std-btn' onclick='exp_complete();' id='act1-btn6'>Next</button>
   `;
    setTimeout(() => {
        MathJax.typeset();
    }, 100);
}
function exp_complete() {
    let btn = (document.getElementById('act1-btn6'));
    btn && btn.remove();
    alert('Experiment Completed');
}
activity1();
//# sourceMappingURL=activity1.js.map