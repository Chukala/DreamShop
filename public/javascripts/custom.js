document.getElementById("input").addEventListener("input", () => {
    const input = document.getElementById("input").value

    if (input.length > 0) {
        
        const queries = new URLSearchParams({
            ajax: input
        })

        fetch('/products/?' + queries.toString())
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                $('#productlisting').html(data); // will overwrite html code already in there
            });
    } else {
        document.getElementById("productlisting").innerHTML = ""
    }


})