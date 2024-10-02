document.addEventListener('DOMContentLoaded', () => {
    const palletes = document.querySelectorAll('.pallete');
    const sidebarList = document.querySelectorAll('.sidebar-list li');
    const colorList = document.querySelectorAll('.color-list li');
    const typographyElements = document.querySelector('.Typography-list').children;
    const main = document.getElementById('main');
    const sidebar = document.getElementById('sidebar');
    const title = document.getElementById('title');
    const fontItems = document.querySelectorAll('.font');

    const fonts = [
        { font: '"Roboto", sans-serif' },
        { font: '"Open Sans", sans-serif' },
        { font: '"Lato", sans-serif' },
        { font: '"Montserrat", sans-serif' },
        { font: '"Poppins", sans-serif' },
        { font: '"Source Code Pro", monospace' }
    ];

    let chosenColor = '#2E2E2E';
    let shadowStyle = `10px 5px #${chosenColor}`;
    let selectedItem = null;

    const applyStyles = (color) => {
        shadowStyle = `10px 5px #${color}`;
        main.style.borderColor = `#${color}`;
        main.style.boxShadow = shadowStyle;
        sidebar.style.borderColor = `#${color}`;
        sidebar.style.boxShadow = shadowStyle;
        title.style.color = `#${color}`;

        sidebarList.forEach(item => {
            item.style.color = `#${color}`;
        });
    };

    const applyTypography = (typography) => {
        Array.from(typographyElements).forEach(element => {
            element.style.fontFamily = typography;
        });
        colorList.forEach(item => {
            item.style.fontFamily = typography;
        });
        sidebarList.forEach(item => {
            item.style.fontFamily = typography;
        });
        title.style.fontFamily = typography;
    };

    palletes.forEach(element => {
        const colorId = element.id;
        element.style.backgroundColor = `#${colorId}`;
        element.style.cursor = 'pointer';

        element.onclick = () => {
            chosenColor = colorId;

            applyStyles(chosenColor);

            palletes.forEach(palette => {
                palette.style.border = '';
                palette.style.boxShadow = '';
            });

            element.style.border = '3px solid';
            element.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';

            if (selectedItem) {
                selectedItem.style.borderColor = `#${chosenColor}`;
            }
        };
    });

    sidebarList.forEach(element => {
        element.onmouseover = () => {
            if (chosenColor && element !== selectedItem) {
                element.style.boxShadow = `10px 5px #${chosenColor}`;
                element.style.border = `1px solid #${chosenColor}`;
            }
        };

        element.onmouseout = () => {
            if (element !== selectedItem) {
                element.style.boxShadow = '';
                element.style.border = '';
            }
        };

        element.onclick = () => {
            if (selectedItem) {
                selectedItem.style.border = '';
            }
            selectedItem = element;
            element.style.border = `1px solid #${chosenColor}`;
            element.style.boxShadow = '';
        };
    });

    fontItems.forEach((item, index) => {
        item.style.fontFamily = fonts[index % fonts.length].font;
        const itemP = item.querySelector('p');
        const itemText = itemP.textContent;

        const boldPara = document.createElement("p");
        const italicPara = document.createElement("p");

        boldPara.textContent = itemText;
        boldPara.style.fontWeight = 'bold';

        italicPara.textContent = itemText;
        italicPara.style.fontStyle = 'italic';

        item.appendChild(boldPara);
        item.appendChild(italicPara);
        


        item.onclick = () => {
            applyTypography(item.style.fontFamily);
        };
    });
});
